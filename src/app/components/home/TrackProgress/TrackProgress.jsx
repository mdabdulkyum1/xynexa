import React from 'react';
import { AiFillCodepenCircle } from 'react-icons/ai';
import { FaBahai, FaLongArrowAltRight } from 'react-icons/fa';
import { FaArrowTrendUp } from 'react-icons/fa6';

const Image1 = [
  'https://i.ibb.co.com/fzgPSGYW/Screenshot-2025-03-16-164444.png',
  'https://i.ibb.co.com/Xrkf8TBN/Screenshot-2025-03-16-164501.png',
  'https://i.ibb.co.com/SXMrDMdX/Screenshot-2025-03-16-164519.png',
  'https://i.ibb.co.com/pCBpXCq/Screenshot-2025-03-16-164527.png',
];

const Image2 = [
  'https://i.ibb.co.com/DDjrVMqc/Screenshot-2025-03-16-164545.png',
  'https://i.ibb.co.com/5WpTCysx/Screenshot-2025-03-16-164557.png',
  'https://i.ibb.co.com/Kcy9gcpf/Screenshot-2025-03-16-164611.png',
];

const TrackProgress = () => {
  return (
    <div className="w-11/12 mx-auto my-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-5 lg:space-y-8">
        <small className="flex items-center gap-2">
          <span className="text-2xl">
            <AiFillCodepenCircle />
          </span>
          Strategies that work
        </small>
        <h4 className="text-2xl md:text-3xl lg:text-4xl font-semibold ">
          Track the progress towards objectstives with key results
        </h4>
        <p className="text-gray-500 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
          officiis voluptatem deserunt, itaque, nobis nam animi corporis beatae.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur,
          facilis?
        </p>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-600">
            <small>
              <FaBahai />
            </small>
          </div>
          <div>
            <h6 className=" font-semibold">
              Discover your best and worst performing audiences
            </h6>
            <p className="text-xs text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
              quos!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-600">
            <small>
              <FaBahai />
            </small>
          </div>
          <div>
            <h6 className=" font-semibold">Keep your team in the loop</h6>
            <p className="text-xs text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
              quos!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-10">
          <button className="btn btn-sm bg-teal-600 text-white border-none">
            Subscribe <FaLongArrowAltRight />
          </button>
          <button className="btn btn-sm btn-ghost">
            <FaArrowTrendUp className=" text-white  text-xl bg-gray-500 p-1 rounded-full" />
            Learn More
          </button>
        </div>
      </div>
      <div className=" flex items-center gap-5">
        <div className="w-2/3 grid grid-cols-2 gap-5">
          {Image1.map((img,inx) => (
            <img key={inx} className="w-full h-full rounded-3xl" src={img} alt="" />
          ))}
        </div>

        <div className="w-1/3 grid grid-cols-1 gap-5">
          {Image2.map((img, inx) => (
            <img key={inx} className="rounded-3xl" src={img} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackProgress;
