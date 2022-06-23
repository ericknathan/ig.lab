import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className='w-full pt-6 flex items-center justify-between border-t border-gray-500 text-gray-300'>
      <div className='flex gap-6'>
        <p>Rocketseat - Todos os direitos reservados</p>
      </div>
      <a href="#">Políticas de privacidade</a>
    </footer>
  );
}
