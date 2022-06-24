import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';

export type LessonTypes = 'live' | 'class';

type LessonProps = {
  title: string;
  slug: string;
  availableAt: Date;
  type: LessonTypes;
};

function getLessonType(type: LessonTypes) {
  switch (type) {
    case 'live':
      return 'AO VIVO';
    case 'class':
    default:
      return 'AULA PRÁTICA';
  }
}

export function Lesson({ availableAt, slug, title, type }: LessonProps) {
  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEEE '•' d 'de' MMMM '•' k'h'mm",
    { locale: ptBR }
  );

  return (
    <a href="#">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div className={['rounded border border-gray-500 p-4 mt-2'].join(' ')}>
        <header
          className={['flex', 'items-center', 'justify-between'].join(' ')}
        >
          {isLessonAvailable ? (
            <span
              className={[
                'text-sm',
                'text-blue-500',
                'font-medium',
                'flex',
                'items-center',
                'gap-2',
              ].join(' ')}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span
              className={[
                'text-sm',
                'text-orange-500',
                'font-medium',
                'flex',
                'items-center',
                'gap-2',
              ].join(' ')}
            >
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={[
              'text-xs',
              'rounded',
              'px-2',
              'py-0.5',
              'text-white',
              'border',
              'border-green-300',
              'font-bold',
            ].join(' ')}
          >
            {getLessonType(type)}
          </span>
        </header>

        <strong className={['text-gray-200', 'mt-5', 'block'].join(' ')}>
          {title}
        </strong>
      </div>
    </a>
  );
}
