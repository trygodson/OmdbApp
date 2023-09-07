import { Link } from 'react-router-dom';

const MovieCards = ({ data }) => {
  return (
    <Link to={'/details'} state={data} className="w-80 h-96 bg-white border rounded p-3">
      <img src={data?.poster} className="h-72 w-full object-contain" />
      <div>
        <p className="w-full text-center text-base my-1">{data?.title}</p>
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-sm italic text-gray-400">Genre</p>
            <p className=" text-sm">{data?.genre}</p>
          </div>
          <div>
            <p className="text-sm italic text-gray-400">Year</p>
            <p className="font-italic text-sm">{data?.year}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCards;
