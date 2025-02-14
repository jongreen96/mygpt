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
import { formatDistanceToNow, isToday } from 'date-fns';
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
      </section>

      <section>
        <Table className='mx-auto max-w-5xl'>
          <TableHeader>
            <TableRow>
              <TableHead>id</TableHead>
              <TableHead>name</TableHead>
              <TableHead>email</TableHead>
              <TableHead>credits</TableHead>
              <TableHead>created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell className={cn(!user.name && 'text-muted')}>
                  {user.name || 'unknown'}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell
                  className={cn(user.credits < 0 && 'text-destructive')}
                >
                  {formatCredits(user.credits)}
                </TableCell>
                <TableCell>
                  {isToday(user.createdAt)
                    ? `${formatDistanceToNow(user.createdAt, { addSuffix: true })}`
                    : user.createdAt.toLocaleString('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true,
                      })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
