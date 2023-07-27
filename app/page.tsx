import Image from 'next/image'
import styles from "./page.module.css"
import Categories from "./navbar/categories"
import Adds from "../components/Add"
import MainLayout from '@/components/layout/RootLayout'
export default function Home() {
  return (
    <MainLayout>
      <main>
        <div >
          <div >
            <Image src="/banner.jpg" alt="banner image"
              width={1500}
              height={1500}
              className={styles.banner} />
          </div>
        </div>
        <div >
          <Categories />
          <Adds />

        </div>

      </main>
    </MainLayout>
  );
}
