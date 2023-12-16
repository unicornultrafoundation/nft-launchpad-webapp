import HomePageBanner from '@/components/homepage/Banner'
import HomePageProjects from '@/components/homepage/Projects'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen px-4 tablet:px-7 desktop:px-20">
      <HomePageBanner />
      <HomePageProjects />
    </main>
  )
}
