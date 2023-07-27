import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  return (
    <div>
      <h2 className="py-5 px-80 text-xl font-bold mb-16">All Categories</h2>
      <ul className="px-80 mt-2 pd:300 flex space-x-10">
        <li>
          <Link
            href="/mobile-phones/6FagwH9vFhhCH7LOD3lt"
            className="flex flex-col items-center"
          >
            <Image
              src="/images/mobiles.png"
              width={100}
              height={50}
              alt="Mobiles"
            />
            <span className="mt-2">Mobiles</span>
          </Link>
        </li>
        <li>
          <Link href="/vehicles" className="flex flex-col items-center">
            <Image
              src="/images/vehicles.png"
              width={100}
              height={50}
              alt="Vehicles"
            />
            <span className="mt-2">Vehicles</span>
          </Link>
        </li>
        <li>
          <Link
            href="/property-for-sale"
            className="flex flex-col items-center"
          >
            <Image
              src="/images/property-for-sale.png"
              width={100}
              height={50}
              alt="Property for Sale"
            />
            <span className="mt-2">Property for Sale</span>
          </Link>
        </li>
        <li>
          <Link
            href="/property-for-rent"
            className="flex flex-col items-center"
          >
            <Image
              src="/images/property-for-rent.png"
              width={100}
              height={50}
              alt="Property for Rent"
            />
            <span className="mt-2">Property for Rent</span>
          </Link>
        </li>
        {/* <li>
          <Link
            href="/electronics-and-home-appliances"
            className="flex flex-col items-center"
          >
            <Image
              src="/images/electronics-home-appliances.png"
              width={100}
              height={50}
              alt="Electronics & Home Appliances"
            />
            <span className="mt-2">Electronics & Home Appliances</span>
          </Link>
        </li> */}
        <li>
          <Link href="/bikes" className="flex flex-col items-center">
            <Image
              src="/images/bikes.png"
              width={100}
              height={50}
              alt="Bikes"
            />
            <span className="mt-2">Bikes</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Categories;
