'use client';

import { models, ModelSettingsType } from '@/lib/ai-models';
import { useIsMobile } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
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

const localSettings =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('conversationSettings') || 'null')
    : (undefined as ModelSettingsType | undefined);

export default function ModelSettings({
  modelSettings,
  setModelSettings,
}: {
  modelSettings: ModelSettingsType;
  setModelSettings: Dispatch<SetStateAction<ModelSettingsType>>;
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSaveDefault = () => {
    localStorage.setItem('conversationSettings', JSON.stringify(modelSettings));
    setOpen(false);
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className='absolute bottom-9 flex items-center gap-2 rounded-t border bg-secondary p-2 py-0'>
          Model Settings
          <ChevronUp className='size-4' />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Model Settings</DrawerTitle>
          </DrawerHeader>

          <div className='p-4'>
            <Settings
              modelSettings={modelSettings}
              setModelSettings={setModelSettings}
            />
          </div>

          <DrawerFooter className='pt-2'>
            <div className='flex w-full flex-col gap-2'>
              {JSON.stringify(localSettings) !==
                JSON.stringify(modelSettings) && (
                <Button variant='outline' onClick={handleSaveDefault}>
                  Set as Default
                </Button>
              )}
              <DrawerClose asChild>
                <Button>Save</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='absolute bottom-9 flex items-center gap-2 rounded-t border bg-secondary p-2 py-0'>
        Model Settings
        <ChevronUp className='size-4' />
      </SheetTrigger>

      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>Model Settings</SheetTitle>
        </SheetHeader>

        <Settings
          modelSettings={modelSettings}
          setModelSettings={setModelSettings}
        />

        <SheetFooter className='pt-2'>
          <div className='flex w-full flex-col gap-2'>
            {JSON.stringify(localSettings) !==
              JSON.stringify(modelSettings) && (
              <Button variant='outline' onClick={handleSaveDefault}>
                Set as Default
              </Button>
            )}
            <SheetClose asChild>
              <Button className='w-full'>Save</Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Settings({
  modelSettings,
  setModelSettings,
}: {
  modelSettings: ModelSettingsType;
  setModelSettings: Dispatch<SetStateAction<ModelSettingsType>>;
}) {
  return (
    <section className='grow'>
      <div>
        <div className='flex items-center gap-2'>
          Model:
          <Select
            value={modelSettings.model}
            onValueChange={(value) =>
              setModelSettings((prev) => ({
                ...prev,
                model: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select AI Model...' />
            </SelectTrigger>

            <SelectContent>
              {Object.entries(models).map((modelGroup) => {
                return (
                  <SelectGroup key={modelGroup[0]}>
                    <SelectLabel className='bg-secondary/25'>
                      {modelGroup[0]}
                    </SelectLabel>
                    {Object.entries(modelGroup[1]).map((model) => {
                      return (
                        <SelectItem key={model[0]} value={model[0]}>
                          {model[0]}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <p className='text-sm text-muted-foreground'>
          {
            models.OpenAI[modelSettings.model as keyof typeof models.OpenAI]
              .description
          }
        </p>
      </div>
    </section>
  );
}
