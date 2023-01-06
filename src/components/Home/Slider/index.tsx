import { Navigation } from 'swiper';
import { Pagination } from 'swiper';
import { IUser } from '../../../types/entities';
import { StHomeSwiper } from './styles';
import { faker } from '@faker-js/faker';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SliderUser from './SliderUser';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

export const USERS: Partial<IUser>[] = [];

export function createRandomUser(): Partial<IUser> {
  return {
    id: faker.datatype.number(),
    firstName: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.image(),
    country: 'US',
  };
}

Array.from({ length: 20 }).forEach(() => {
  USERS.push(createRandomUser());
});

const Slider = () => {
  const isTablet = useMediaQuery('(max-width: 1200px)');
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const isSmallest = useMediaQuery('(max-width: 540px)');

  const slides = isSmallest ? 1 : isMobile ? 2 : isTablet ? 3 : 4;

  return (
    <>
      <StHomeSwiper
        // pagination={{
        //   dynamicBullets: true,
        // }}
        modules={[Navigation, Pagination]}
        navigation={true}
        onAfterInit={(sw) => (sw.activeIndex = 0)}
        initialSlide={0}
        slidesPerView={slides}
        spaceBetween={20}
        slidesPerGroup={slides}
      >
        {USERS.map((u) => (
          <SwiperSlide key={u.id}>
            <SliderUser user={u} />
          </SwiperSlide>
        ))}
      </StHomeSwiper>
    </>
  );
};

export default Slider;
