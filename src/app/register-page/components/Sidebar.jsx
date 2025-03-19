import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-[#946ef7] text-white p-5 md:p-10 lg:p-16 space-y-5">
      <h4 className="text-3xl lg:text-4xl font-bold uppercase">Information</h4>
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quam
        consequatur tempora ab ratione pariatur nemo blanditiis laboriosam culpa
        dolores, ut fuga voluptatum distinctio ipsam vero officiis reiciendis
        harum repudiandae! <br /> <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
        architecto ducimus minima corrupti vel esse animi rem labore aperiam
        beatae, ullam minus optio harum eum dicta quae explicabo provident
        doloribus.
      </p>
      <button className="btn border-none text-[#946ef7] font-bold rounded-none rounded-br-sm rounded-tl-sm px-10 mt-10">
        Have an account
      </button>
    </div>
  );
};

export default Sidebar;
