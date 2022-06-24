import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function LessonCard(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(
    props.availableAt,
    "EEEE '•' dd 'de' LLLL '•' k'h'mm",
    { locale: ptBR }
  );

  const isActiveLesson = slug === props.slug;

  return (
    <div className={!isLessonAvailable ? 'cursor-not-allowed' : 'wrapper'}>
      <Link
        to={isLessonAvailable ? `/event/lesson/${props.slug}` : '#'}
        className={!isLessonAvailable ? 'pointer-events-none' : 'group'}
      >
        <span className='text-gray-300'>{availableDateFormatted}</span>
        <div
          className={classNames(
            'rounded border p-4 mt-2 group-hover:border-green-500',
            {
              'bg-green-500': isActiveLesson,
              'border-gray-500': !isLessonAvailable,
              'border-green-500': isLessonAvailable,
            }
          )}
        >
          <header className='flex items-center justify-between'>
            {isLessonAvailable ? (
              <span
                className={classNames(
                  'text-sm font-medium flex items-center gap-2',
                  {
                    'text-white': isActiveLesson,
                    'text-blue-500': !isActiveLesson,
                  }
                )}
              >
                <CheckCircle size={20} />
                Conteúdo liberado
              </span>
            ) : (
              <span className='text-sm text-orange-500 font-medium flex items-center gap-2'>
                <Lock size={20} />
                Em breve
              </span>
            )}
            <span
              className={classNames(
                'text-xs rounded py-[0.125rem] px-2 text-white border font-bold',
                {
                  'border-white': isActiveLesson,
                  'border-green-300': !isActiveLesson,
                }
              )}>
              {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
            </span>
          </header>
          <strong
            className={classNames('mt-5 block', {
              'text-white': isActiveLesson,
              'text-gray-200': !isActiveLesson,
            })}
          >
            {props.title}
          </strong>
        </div>
      </Link>
    </div>
  );
}
