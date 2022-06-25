import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Logo } from '../components/Logo';
import { useCreateSubscriberMutation, useGetFirstLessonQuery } from '../graphql/generated';
import codeMockupImageUrl from '../assets/code-mockup.png'

export function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();
  const { data } = useGetFirstLessonQuery();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: { name, email },
    });

    if (data) {
      navigate(`/event/lesson/${data.lessons[0].slug}`);
    }
  }

  return (
    <div className='min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center'>
      <div className='w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto'>
        <div className='max-w-[640px]'>
          <Logo />
          <h1 className='mt-8 text-[2.5rem] leading-tight'>
            Construa uma{' '}
            <strong className='text-blue-500'>aplicação completa</strong>, do
            zero, com <strong className='text-blue-500'>React</strong>
          </h1>
          <p className='mt-4 text-gray-200 leading-relaxed'>
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>
        <div className='p-8 bg-gray-700 border border-gray-500 rounded'>
          <strong className='text-2xl mb-6 block'>
            Inscreva-se gratuitamente
          </strong>
          <form
            onSubmit={handleSubscribe}
            className='flex flex-col gap-2 w-full'
          >
            <Input
              placeholder='Seu nome completo'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type='email'
              placeholder='Digite seu e-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button tag='button' className='mt-4' disabled={loading || name.trim().length == 0 || email.trim().length == 0}>
              Garantir minha vaga
            </Button>
          </form>
        </div>
      </div>
      <img
        src={codeMockupImageUrl}
        className='mt-10'
        alt='Mockup de código'
      />
    </div>
  );
}
