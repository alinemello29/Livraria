import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Inicio from '../../Pages/Inicio/inicio';
import LivrosDoados from '../../Pages/LivrosDoados/LivrosDoados';
import QueroDoar from '../../Pages/QueroDoar/QueroDoar';
import logoLivro from '../../assets/logolivro.png';
import lupa from '../../assets/lupa.png';
import s from './header.module.scss';
// Ao importar o Sass como um módulo (.module.scss), conseguimos usar estilos isolados dentro do componente, ou seja, eles só serão aplicados ao componente onde estão importados. Isso ajuda a evitar estilos acidentais que podem "vazar" para outros componentes.

export default function Header() {
  return (
    <BrowserRouter>
      <header className={s.header}>
        <section className={s.logoHeader}>
          <img
            src={logoLivro}
            alt="Imagem de ilustração de livvro aberto com capa azul"
          />
          <h1>Livros Vai na Web</h1>
        </section>
        <nav className={s.navHeader}>
          <ul>
            <li>
              <Link className={s.link} to="/">
                Início
              </Link>
            </li>
            <li>
              <Link className={s.link} to="/livrosdoados">
                Livros Doados
              </Link>
            </li>
            <li>
              <Link className={s.link} to="/querodoar">
                Quero Doar
              </Link>
            </li>
          </ul>
        </nav>
        <section className={s.barraDeBusca}>
          <input
            type="search"
            name=""
            id=""
            placeholder="O que você procura?"
          />
          <button>
            <img src={lupa} alt="Icone de lupa branca" />
          </button>
        </section>
      </header>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/livrosdoados" element={<LivrosDoados />} />
        <Route path="/querodoar" element={<QueroDoar />} />
      </Routes>
    </BrowserRouter>
  );
}
