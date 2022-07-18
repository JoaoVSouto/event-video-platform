import * as React from 'react';

import { gql, useMutation } from '@apollo/client';

import { Logo } from '@/components/Logo';
import { useNavigate } from 'react-router-dom';

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`;

export function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [createSubscriber, { loading }] = useMutation(
    CREATE_SUBSCRIBER_MUTATION
  );

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email,
      },
    });

    navigate('/event');
  }

  return (
    <div
      className={[
        'min-h-screen',
        'bg-blur',
        'bg-cover',
        'bg-no-repeat',
        'flex',
        'flex-col',
        'items-center',
      ].join(' ')}
    >
      <div
        className={[
          'w-full',
          'max-w-[1100px]',
          'flex',
          'items-center',
          'justify-between',
          'mt-20',
          'mx-auto',
        ].join(' ')}
      >
        <div className={['max-w-[640px]'].join(' ')}>
          <Logo />

          <h1 className={['mt-8', 'text-[2.5rem]', 'leading-tight'].join(' ')}>
            Construa uma{' '}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className={['mt-4', 'text-gray-200', 'leading-relaxed'].join(' ')}>
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>

        <div
          className={[
            'p-8',
            'bg-gray-700',
            'border',
            'border-gray-500',
            'rounded',
          ].join(' ')}
        >
          <strong className={['text-2xl', 'mb-6', 'block'].join(' ')}>
            Inscreva-se gratuitamente
          </strong>

          <form
            onSubmit={handleSubscribe}
            className={['flex', 'flex-col', 'gap-2', 'w-full'].join(' ')}
          >
            <input
              className={['bg-gray-900', 'rounded', 'px-5', 'h-14'].join(' ')}
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className={['bg-gray-900', 'rounded', 'px-5', 'h-14'].join(' ')}
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className={[
                'mt-4',
                'bg-green-500',
                'uppercase',
                'py-4',
                'rounded',
                'font-bold',
                'text-sm',
                'hover:bg-green-700',
                'transition-colors',
                'disabled:opacity-50',
              ].join(' ')}
              disabled={loading}
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <img
        src="/src/assets/code-mockup.png"
        className="mt-10"
        alt="Code mockup"
      />
    </div>
  );
}
