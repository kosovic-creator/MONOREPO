import HomeClient from './HomeClent';
import { UčitajPost } from '../app/actions/post';

export default async function Home() {
 const postovi = await UčitajPost();

  return (
    <main className="p-8 text-2xl font-bold">
     <HomeClient postovi={postovi} />
    </main>
  );
}
