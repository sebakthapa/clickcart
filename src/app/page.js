import Info from '@/components/Info'
import Nav from '@/components/Nav'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='home'>
      <Info message="Get 50% off on selected items" phone="+056-23485" link="#" />
      <Nav />
    </div>
  )
}
