'use client';

import { models, ModelSettingsType } from '@/lib/ai-models';
import { useIsMobile } from '@/lib/utils';
import { MessageCircleQuestionIcon, Settings2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Input } from '../ui/input';
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
        <div className='flex items-center justify-between gap-2'>
          <span>Model:</span>
          <Select
            value={modelSettings.model}
            onValueChange={(value) =>
              setModelSettings((prev) => ({
                ...prev,
                model: value,
              }))
            }
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
          {models[modelSettings.model as keyof typeof models].description}
        </p>
      </div>

      <div>
        <Accordion type='single' collapsible>
          <AccordionItem value='1'>
            <AccordionTrigger>Advanced</AccordionTrigger>
            <AccordionContent className='space-y-2'>
              <div className='flex items-center justify-between gap-2'>
                <span>Max Tokens:</span>
                <div className='flex gap-2'>
                  <Dialog>
                    <DialogTrigger>
                      <MessageCircleQuestionIcon className='size-4' />
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Max Tokens
                            <span className='ml-5 font-normal text-muted-foreground'>
                              Default: Unlimited
                            </span>
                          </DialogTitle>
                          <DialogDescription>
                            An upper bound for the number of tokens that can be
                            generated for a completion, including visible output
                            tokens and reasoning tokens.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </DialogTrigger>
                  </Dialog>
                  <Input
                    type='number'
                    min={0}
                    className='w-52'
                    placeholder='unlimited'
                    value={modelSettings.maxTokens || ''}
                    onChange={(e) => {
                      const value =
                        e.target.value === '' ? 0 : Number(e.target.value);
                      setModelSettings((prev) => ({
                        ...prev,
                        maxTokens: value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className='flex items-center justify-between gap-2'>
                <span>Temperature:</span>
                <div className='flex gap-2'>
                  <Dialog>
                    <DialogTrigger>
                      <MessageCircleQuestionIcon className='size-4' />
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Temperature
                            <span className='ml-5 font-normal text-muted-foreground'>
                              Default: 1
                            </span>
                          </DialogTitle>
                          <DialogDescription>
                            What sampling temperature to use, between 0 and 2.
                            Higher values like 0.8 will make the output more
                            random, while lower values like 0.2 will make it
                            more focused and deterministic. <br />
                            <br /> We generally recommend altering this or
                            temperature but not both.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </DialogTrigger>
                  </Dialog>
                  <Input
                    type='number'
                    min={0}
                    max={2}
                    step={0.01}
                    className='w-52'
                    placeholder='1 (default)'
                    value={modelSettings.temperature}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setModelSettings((prev) => ({
                        ...prev,
                        temperature: value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className='flex items-center justify-between gap-2'>
                <span>Top P:</span>
                <div className='flex gap-2'>
                  <Dialog>
                    <DialogTrigger>
                      <MessageCircleQuestionIcon className='size-4' />
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Top P
                            <span className='ml-5 font-normal text-muted-foreground'>
                              Default: 1
                            </span>
                          </DialogTitle>
                          <DialogDescription>
                            An alternative to sampling with temperature, called
                            nucleus sampling, where the model considers the
                            results of the tokens with top_p probability mass.
                            So 0.1 means only the tokens comprising the top 10%
                            probability mass are considered. <br />
                            <br /> We generally recommend altering this or
                            temperature but not both.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </DialogTrigger>
                  </Dialog>
                  <Input
                    type='number'
                    min={0}
                    max={1}
                    step={0.01}
                    className='w-52'
                    placeholder='1 (default)'
                    value={modelSettings.topP}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setModelSettings((prev) => ({
                        ...prev,
                        topP: value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className='flex items-center justify-between gap-2'>
                <span>Presence penalty:</span>
                <div className='flex gap-2'>
                  <Dialog>
                    <DialogTrigger>
                      <MessageCircleQuestionIcon className='size-4' />
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Presence penalty
                            <span className='ml-5 font-normal text-muted-foreground'>
                              Default: 0
                            </span>
                          </DialogTitle>
                          <DialogDescription>
                            Number between -2.0 and 2.0. Positive values
                            penalize new tokens based on whether they appear in
                            the text so far, increasing the model&apos;s
                            likelihood to talk about new topics.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </DialogTrigger>
                  </Dialog>
                  <Input
                    type='number'
                    min={-2}
                    max={2}
                    step={0.01}
                    className='w-52'
                    placeholder='0 (default)'
                    value={modelSettings.presencePenalty}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setModelSettings((prev) => ({
                        ...prev,
                        presencePenalty: value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className='flex items-center justify-between gap-2'>
                <span>Frequency penalty:</span>
                <div className='flex gap-2'>
                  <Dialog>
                    <DialogTrigger>
                      <MessageCircleQuestionIcon className='size-4' />
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Frequency Penalty
                            <span className='ml-5 font-normal text-muted-foreground'>
                              Default: 0
                            </span>
                          </DialogTitle>
                          <DialogDescription>
                            Number between -2.0 and 2.0. Positive values
                            penalize new tokens based on their existing
                            frequency in the text so far, decreasing the
                            model&apos;s likelihood to repeat the same line
                            verbatim.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </DialogTrigger>
                  </Dialog>
                  <Input
                    type='number'
                    min={-2}
                    max={2}
                    step={0.01}
                    className='w-52'
                    placeholder='0 (default)'
                    value={modelSettings.frequencyPenalty}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setModelSettings((prev) => ({
                        ...prev,
                        frequencyPenalty: value,
                      }));
                    }}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
