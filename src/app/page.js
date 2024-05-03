import Hero from '@/components/layouts/Hero';
import HomeMenu from '@/components/layouts/HomeMenu';
import SectionHeader from '@/components/layouts/SectionHeader';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className='text-center my-16'>
        <SectionHeader
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div
          className='max-w-2xl mx-auto mt-4
         text-gray-500 flex flex-col
          gap-4'
        >
          <p>
            💛 Cung cấp sỉ & lẻ trang sức <br />
            💚 Gia công trang sức bằng đá, vàng,
            bạc, dây dệt,...
          </p>
        </div>
      </section>
      <section className='text-center my-8'>
        <SectionHeader
          subHeader={"Don't hesitate"}
          mainHeader={'Contact us'}
        />
        <div className='m-8'>
          <a
            className='text-4xl underline text-gray-500'
            href='tel:+84355111165'
          >
            +8435 511 1165
          </a>
        </div>
      </section>
    </>
  );
}
