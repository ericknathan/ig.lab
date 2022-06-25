import classNames from 'classnames';
import rocketseatLogoUrl from '../assets/logo-rocketseat.svg';

interface FooterProps {
  width?: 'full' | 'compact';
}

export function Footer({ width = 'full' }: FooterProps ) {
  return (
    <footer className={classNames('w-full pt-6 flex items-center justify-between border-t border-gray-500 text-gray-300', {
      'px-4': width === 'full',
      'pb-6': width === 'full',
    })}>
      <div className='flex gap-6'>
        <img src={rocketseatLogoUrl} alt="Logo da Rocketseat" />
        <p>Rocketseat - Todos os direitos reservados</p>
      </div>
      <a href="#">Políticas de privacidade</a>
    </footer>
  );
}
