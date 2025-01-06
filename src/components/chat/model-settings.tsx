'use client';

import { useIsMobile } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

export default function ModelSettings() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className='absolute bottom-9 flex items-center gap-2 rounded-t border p-2 py-0'>
          Model Settings
          <ChevronUp className='size-4' />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Model Settings</DrawerTitle>
          </DrawerHeader>

          <Settings />

          <DrawerFooter className='pt-2'>
            <DrawerClose asChild>
              <Button variant='outline'>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='absolute bottom-9 flex items-center gap-2 rounded-t border p-2 py-0'>
        Model Settings
        <ChevronUp className='size-4' />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Model Settings</SheetTitle>
        </SheetHeader>

        <Settings />

        <SheetFooter className='pt-2'>
          <SheetClose asChild>
            <Button variant='outline' className='w-full'>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// TODO: Implement model settings
function Settings() {
  return (
    <section>
      <div className='flex items-center gap-2'>
        Model:
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Select AI Model...' />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>OpenAI</SelectLabel>

              <SelectItem value='model 1'>Model 1</SelectItem>
              <SelectItem value='model 2'>Model 2</SelectItem>
              <SelectItem value='model 3'>Model 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
