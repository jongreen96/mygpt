import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { auth } from '@/lib/auth';
import { getAdminStats } from '@/lib/db';
import { cn, formatCredits } from '@/lib/utils';
import {
  formatDistance,
  formatDistanceToNow,
  isThisWeek,
  isToday,
} from 'date-fns';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const session = await auth();
  if (session?.user?.email !== 'jongreen1996@gmail.com') redirect('/chat');

  const stats = await getAdminStats();

  return (
    <main className='mt-10 space-y-16 p-2'>
      <section className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Total Users:</CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-2'>
            <p className='text-5xl font-bold'>{stats.users.length}</p>
            <p className='text-xl text-muted-foreground'>
              +{stats.users.filter((user) => isToday(user.createdAt)).length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gross Revenue:</CardTitle>
          </CardHeader>
          <CardContent className='flex items-baseline gap-2'>
            <p className='text-5xl font-bold'>${stats.totalRevenue}</p>
            <p className='text-sm text-muted-foreground'>
              {stats.transactionCount} orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Net Revenue:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-5xl font-bold'>~${stats.totalRevenue * 0.2}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Liability:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-5xl font-bold'>
              ${((stats.totalCredits / 100000) * 0.66).toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              Total Conversations:
              <span className='font-normal'>
                {new Intl.NumberFormat('en-GB').format(
                  stats.stats.totalConversations,
                )}
              </span>
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              Total Messages:
              <span className='font-normal'>
                {new Intl.NumberFormat('en-GB').format(
                  stats.stats.totalMessages,
                )}
              </span>
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              Total Input Tokens:
              <span className='font-normal'>
                {new Intl.NumberFormat('en-GB').format(
                  stats.stats.totalInputTokens,
                )}
              </span>
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              Total Output Tokens:
              <span className='font-normal'>
                {new Intl.NumberFormat('en-GB').format(
                  stats.stats.totalOutputTokens,
                )}
              </span>
            </CardTitle>
          </CardHeader>
        </Card>
      </section>

      <section>
        <Table className='mx-auto max-w-5xl'>
          <TableHeader>
            <TableRow>
              <TableHead>name</TableHead>
              <TableHead className='hidden sm:block'>email</TableHead>
              <TableHead>credits</TableHead>
              <TableHead>created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className={cn(!user.name && 'text-muted')}>
                  {user.name || 'unknown'}
                </TableCell>
                <TableCell className='hidden sm:block'>{user.email}</TableCell>
                <TableCell
                  className={cn(user.credits < 0 && 'text-destructive')}
                >
                  {formatCredits(user.credits)}
                </TableCell>
                <TableCell>
                  {isToday(user.createdAt)
                    ? formatDistanceToNow(user.createdAt, { addSuffix: true })
                    : isThisWeek(user.createdAt)
                      ? `${formatDistance(user.createdAt, new Date())} ago`
                      : new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
