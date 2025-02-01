'use client';

import { ModelListType, models } from '@/lib/ai-models';
import { useIsMobile } from '@/lib/utils';
import { Settings2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
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
  SelectItem,
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

export default function ModelSettings({
  selectedModel,
  setSelectedModel,
}: {
  selectedModel: ModelListType;
  setSelectedModel: Dispatch<SetStateAction<ModelListType>>;
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant='secondary' size='icon'>
            <Settings2 className='scale-125' />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Model Settings</DrawerTitle>
          </DrawerHeader>

          <div className='p-4'>
            <Settings
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
          </div>

          <DrawerFooter className='pt-2'>
            <div className='flex w-full flex-col gap-2'>
              <DrawerClose asChild>
                <Button>Close</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='secondary' size='icon'>
          <Settings2 className='scale-125' />
        </Button>
      </SheetTrigger>

      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>Model Settings</SheetTitle>
        </SheetHeader>

        <Settings
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

        <SheetFooter className='pt-2'>
          <div className='flex w-full flex-col gap-2'>
            <SheetClose asChild>
              <Button className='w-full'>Close</Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Settings({
  selectedModel,
  setSelectedModel,
}: {
  selectedModel: ModelListType;
  setSelectedModel: Dispatch<SetStateAction<ModelListType>>;
}) {
  return (
    <section className='grow'>
      <div>
        <div className='flex items-center justify-between gap-2'>
          <span>Model:</span>
          <Select
            value={selectedModel}
            onValueChange={(value) => setSelectedModel(value as ModelListType)}
          >
            <SelectTrigger className='w-52'>
              <SelectValue placeholder='Select AI Model...' />
            </SelectTrigger>

            <SelectContent>
              {Object.entries(models).map(([key]) => {
                return (
                  <SelectItem key={key} value={key}>
                    {key}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <p className='text-sm text-muted-foreground'>
          {models[selectedModel as keyof typeof models].description}
        </p>
      </div>
    </section>
  );
}
