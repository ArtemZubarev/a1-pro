import { getData } from '@/app/getData';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Game {
  identifier: string; // уникальный идентификатор игры
  seo_title: string; // уникальный SEO-ключ игры
  title: string; // Текстовое название игры
  provider: string; // ID провайдера игры
  categories: string[]; // Список ID категорий, в которые входит игра
}

interface IProps {
  params: {
    seo_title: string;
    slug: string;
  },
}

export const dynamicParams = false;

export default async function Game({ params }: IProps) {
  const res = await getData();
  const data = res.find((item: Game) => item.seo_title === params.seo_title && params.slug === item.provider);
  // if (!data) {
  //   notFound();
  // }
  const img = `${process.env.DB_IMAGES_URL}/${data.identifier}.webp`;

  return (
    <div className="flex flex-col items-center">
      <div className="cover">
        <img src={img} alt={data.title} />
      </div>
      <div className="text-lg bold">{data.title}</div>
      <div className="text-l"><b>Provider: </b>{data.provider}</div>
      <b>Categories:</b>
      <div className="text-md flex flex-wrap px-1 gap-10">
        {data.categories.map((category: string) => <span key={category}>{category}</span>)}
      </div>
    </div>
  )
};

export async function generateStaticParams() {
  const res = await getData();

  let resultArray = [];

  for (let i = 0; i < res.length; i++) {
    const item = res[i];
    const categories = item.categories;

    resultArray.push({
      // ...item,
      params: {
        slug: item.provider,
        seo_title: item.seo_title
      }
    });

    for (let j = 0; j < categories.length; j++) {
      resultArray.push({
        // ...item,
        params: {
          slug: categories[j],
          seo_title: item.seo_title
        }
      })
    }
  }

  // const games = res.map((game: Game) => ({
  //   params: {
  //     ...game
  //   },
  // }));

  // return {
  //   paths: resultArray,
  //   fallback: false
  // };
  return resultArray
};