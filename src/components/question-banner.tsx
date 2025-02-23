'use client';

import { seededShuffle } from '@/lib/utils';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useMemo } from 'react';
import { Badge } from './ui/badge';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

const questions = [
  'What is the capital of France?',
  'Who is the president of America?',
  'What are the main causes of climate change?',
  'Can you explain the theory of relativity?',
  'What is the history of Rome?',
  'How does artificial intelligence work?',
  'What are the latest trends in technology?',
  'Can you explain blockchain technology?',
  'What is the difference between machine learning and deep learning?',
  'How do I start learning programming?',
  'What are the benefits of a balanced diet?',
  'How can I improve my mental health?',
  'What are some effective workout routines?',
  'What is mindfulness, and how can I practice it?',
  'What are the symptoms of covid?',
  'What are the best study techniques?',
  'How can I improve my writing skills?',
  'What are some good resources for learning maths?',
  'How do I prepare for a job interview?',
  'What are the benefits of higher education?',
  'What are some good movies to watch?',
  'Can you recommend some books?',
  'What are the most popular video games right now?',
  'Who won the latest f1 wdc?',
  'What are the best TV shows of all time?',
  'What are the top tourist attractions in Italy?',
  'How can I travel on a budget?',
  'What are the best travel tips for Paris?',
  'What should I pack for a trip to the coast?',
  'How do I find cheap flights?',
  'How can I set and achieve my goals?',
  'What are some tips for improving time management?',
  'How can I build self-confidence?',
  'What are the best practices for effective communication?',
  'How do I deal with procrastination?',
  'How can I improve my communication with my partner?',
  'What are the signs of a healthy relationship?',
  'How do I handle conflict in a relationship?',
  'What are some tips for making new friends?',
  'How can I support a friend in need?',
  'What is the meaning of life?',
  'Can you explain utilitarianism?',
  'What are the main ethical theories?',
  'How do different cultures view morality?',
  'What is existentialism?',
  'What are the laws of thermodynamics?',
  'How does photosynthesis work?',
  'What is the structure of DNA?',
  'Can you explain quantum mechanics?',
  'What are black holes?',
  'How do I start a blog?',
  'What are some fun facts about Apple?',
  'How can I improve my public speaking skills?',
  'What are the best practices for online safety?',
  'How do I create a budget?',
  'What were the main causes of World War I?',
  'Who were the key figures in the American Civil Rights Movement?',
  'What is the significance of the Renaissance?',
  'How did the Roman Empire fall?',
  'What were the major events of the Cold War?',
  'How can I save money effectively?',
  'What is the stock market, and how does it work?',
  'What are the basics of investing?',
  'How do I create a personal budget?',
  'What is cryptocurrency, and how does it work?',
  'What are some easy recipes for beginners?',
  'How do I meal prep for the week?',
  'What are the health benefits of eating vegetables?',
  'How can I make a perfect omelet?',
  'What are some popular international dishes?',
  'What are some tips for new parents?',
  'How can I help my child with homework?',
  'What are the benefits of reading to children?',
  "How do I handle a toddler's tantrums?",
  'What are some fun activities for kids?',
  'What are the effects of plastic pollution?',
  'How can I reduce my carbon footprint?',
  'What are renewable energy sources?',
  'How does deforestation impact the planet?',
  'What are the benefits of recycling?',
  'How do I write a resume?',
  'What are the best job search strategies?',
  'How can I ask for a raise?',
  'What skills are in demand in the job market?',
  'How do I network effectively?',
  'What are some popular hobbies to try?',
  'How do I start gardening?',
  'What are the basics of photography?',
  'How can I learn to play a musical instrument?',
  'What are some fun DIY projects?',
  'What are the signs of anxiety?',
  'How can I manage stress effectively?',
  'What is cognitive behavioral therapy (CBT)?',
  'What are the stages of grief?',
  'How does the placebo effect work?',
  'Who are some famous authors in Crime/Romance?',
  'What are the themes in Harry Potter?',
  'How do I analyze a poem?',
  'What are some classic novels everyone should read?',
  'How can I improve my reading comprehension?',
  'What are the rules of formula one?',
  'Who are the greatest athletes of all time?',
  'How can I get started with running?',
  'What are the benefits of team sports?',
  'How do I improve my skills in Rugby?',
  'What are the main cultural differences between Japan and China?',
  'How does art influence society?',
  'What are some traditional festivals around the world?',
  'How do music and culture intersect?',
  'What are the characteristics of a superbike?',
  'What are the latest developments in space?',
  'How do I stay informed about global issues?',
  'What are the implications of the war?',
  'How do political systems differ around the world?',
  'What are the major challenges facing humanity today?',
  'How do I improve my critical thinking skills?',
  'What are some effective relaxation techniques?',
  'How can I learn a new language quickly?',
  'What are the benefits of volunteering?',
  'How do I create a vision board?',
  'What is cloud computing?',
  'How do I build a website?',
  'What programming languages should I learn first?',
  'What are the differences between iOS and Android?',
  'How do I protect my online privacy?',
  'What are some beginner painting techniques?',
  'How do I start knitting or crocheting?',
  'What materials do I need for scrapbooking?',
  'How can I improve my drawing skills?',
  'What are some fun craft ideas for kids?',
  'What are the main beliefs of Buddhism?',
  'How do different religions view the afterlife?',
  'What is the concept of free will?',
  'Can you explain the Socratic method?',
  'What are the ethical implications of artificial intelligence?',
  'What are the most spoken languages in the world?',
  'How can I improve my vocabulary?',
  'What are some tips for learning a new language?',
  'What is the difference between dialect and accent?',
  'How do idioms work in different languages?',
  'What are the current fashion trends?',
  'How can I develop my personal style?',
  'What are some tips for sustainable fashion?',
  'How do I choose the right outfit for an occasion?',
  'What are the basics of color theory in fashion?',
  'How do I care for indoor plants?',
  'What are some tips for organizing my home?',
  'How can I create a cozy living space?',
  'What are the best practices for home maintenance?',
  'How do I start a vegetable garden?',
  'What are the main causes of poverty?',
  'How can I get involved in social justice initiatives?',
  'What are the effects of systemic racism?',
  'How do gender roles vary across cultures?',
  'What are the challenges faced by refugees?',
  'What is the difference between a credit score and a credit report?',
  'How do I pay off debt effectively?',
  'What are the benefits of having an emergency fund?',
  'How can I start investing in real estate?',
  'What are the basics of retirement planning?',
  'What is the water cycle?',
  'How do ecosystems function?',
  'What are the different types of renewable energy?',
  'How does evolution work?',
  'What are the effects of global warming on wildlife?',
  'How can I improve my listening skills?',
  'What are the signs of a toxic relationship?',
  'How do I maintain long-distance friendships?',
  'What are some effective conflict resolution strategies?',
  'How can I express gratitude in meaningful ways?',
  'What are the signs of depression?',
  'How can I practice self-care?',
  'What is the importance of therapy?',
  'How do I cope with anxiety in social situations?',
  'What are some mindfulness exercises I can try?',
  'What are the best travel apps?',
  'How do I plan a road trip?',
  'What are some tips for solo travel?',
  'How can I travel sustainably?',
  'What are the must-see landmarks in England?',
  'What are the benefits of a plant-based diet?',
  'How do I read nutrition labels?',
  'What are some healthy snack ideas?',
  'How can I reduce food waste?',
  'What are the differences between organic and conventional food?',
  'How do I create a LinkedIn profile?',
  'What are the best ways to ask for feedback at work?',
  'How can I transition to a new career?',
  'What are the benefits of mentorship?',
  'How do I handle workplace stress?',
  'What are some fun facts about space?',
  'How do I start a podcast?',
  'What are the benefits of journaling?',
  'How can I improve my decision-making skills?',
  'What are some effective ways to learn from failure?',
  'What are some interesting trivia questions?',
  'How do I host a game night?',
  'What are the best board games for families?',
  'How can I create a movie night experience at home?',
  'What are some popular music genres and their characteristics?',
];

export const QuestionBanner = () => {
  const shuffledArrays = useMemo(() => {
    return Array(5)
      .fill(null)
      .map((_, i) => seededShuffle(questions, 1234 + i));
  }, []);

  return (
    <section className='gap-.5 flex w-full flex-col items-center'>
      {shuffledArrays.map((shuffledQuestions, rowIndex) => (
        <CarouselRow
          key={rowIndex}
          questions={shuffledQuestions}
          direction={rowIndex % 2 === 0}
        />
      ))}
    </section>
  );
};

const CarouselRow = ({
  questions,
  direction,
}: {
  questions: string[];
  direction: boolean;
}) => {
  return (
    <Carousel
      className='w-full'
      plugins={[
        AutoScroll({
          playOnInit: true,
          speed: 0.2 + Math.random() * 0.4, // This clamps between 0.2 and 0.6
          startDelay: 1,
          stopOnInteraction: false,
          direction: direction ? 'backward' : 'forward',
        }),
      ]}
      opts={{
        dragFree: true,
        loop: true,
      }}
    >
      <CarouselContent className='-ml-1'>
        {questions.map((question, index) => (
          <CarouselItem
            key={`${question}-${index}`}
            className='basis-auto pl-1'
          >
            <Badge
              variant='secondary'
              className='select-none rounded-sm border border-muted bg-background px-2'
            >
              {question}
            </Badge>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
