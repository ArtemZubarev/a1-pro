import cn from 'classnames';
import styles from './styles.module.css';
import Link from 'next/link';
import { getData } from '../getData';

interface Game {
  identifier: string; // уникальный идентификатор игры
  seo_title: string; // уникальный SEO-ключ игры
  title: string; // Текстовое название игры
  provider: string; // ID провайдера игры
  categories: string[]; // Список ID категорий, в которые входит игра
}

export default async function Games() {
  const games: Game[] = await getData();

  return (
    <div>
      <div className={cn(['flex', 'gap-4', 'flex-wrap'])}>
        {games.map((game: Game) => (
          <Link
            href={`/games/${game.provider}/${game.seo_title}`}
            key={game.identifier}
            className="hover:bg-sky-700 hover:text-white px-1"
          >
            {game.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
