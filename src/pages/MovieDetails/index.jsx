import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthPagesLayout from '../../layout/AuthPagesLayout';

const MovieDetails = () => {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  return (
    <AuthPagesLayout noHeader={loading}>
      {/* main */}
      {!state ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <p className="text-base text-red-500">Please Go Back Select A Movie</p>
        </div>
      ) : (
        <section className="w-screen px-4 py-5">
          <div className="w-full flex flex-row justify-center">
            <img src={state?.poster} className="w-96 object-cover" style={{ height: '70vh' }} />
          </div>
          <div>
            <div className="flex flex-row justify-between px-8 py-5 my-2 border-b border-gray-300 rounded">
              <p className="text-sm italic text-gray-400">Title</p>
              <p className="font-italic text-sm">{state?.title}</p>
            </div>
            <div className="flex flex-row justify-between px-8 py-5 my-2 border-b border-gray-300 rounded">
              <p className="text-sm italic text-gray-400">Year</p>
              <p className="font-italic text-sm">{state?.year}</p>
            </div>
            <div className="flex flex-row justify-between px-8 py-5 my-2 border-b border-gray-300 rounded">
              <p className="text-sm italic text-gray-400">Released</p>
              <p className="font-italic text-sm">{state?.released}</p>
            </div>
            <div className="flex flex-row justify-between px-8 py-5 my-2 border-b border-gray-300 rounded">
              <p className="text-sm italic text-gray-400">RunTime</p>
              <p className="font-italic text-sm">{state?.runtime}</p>
            </div>
            <div className="flex flex-row justify-between px-8 py-5 my-2 border-b border-gray-300 rounded">
              <p className="text-sm italic text-gray-400">Genre</p>
              <p className="font-italic text-sm">{state?.genre}</p>
            </div>
            <div className="flex flex-row justify-between px-8 py-5 my-2 border-b border-gray-300 rounded">
              <p className="text-sm italic text-gray-400">Director</p>
              <p className="font-italic text-sm">{state?.director}</p>
            </div>
            <div className="flex flex-row justify-between px-8 py-5 my-2 border-b border-gray-300 rounded">
              <p className="text-sm italic text-gray-400">Actors</p>
              <p className="font-italic text-sm">{state?.actors}</p>
            </div>
            <div className="flex flex-row justify-between px-8 py-5 my-2 border-b border-gray-300 rounded">
              <p className="text-sm italic text-gray-400">Language</p>
              <p className="font-italic text-sm">{state?.language}</p>
            </div>
            <div className="flex flex-row justify-between px-8 py-5 my-2 border-b border-gray-300 rounded">
              <p className="text-sm italic text-gray-400">Country</p>
              <p className="font-italic text-sm">{state?.country}</p>
            </div>
            <div className="flex flex-row justify-between px-8 py-5 my-2 border-b border-gray-300 rounded">
              <p className="text-sm italic text-gray-400">IMDB Rating</p>
              <p className="font-italic text-sm">{state?.imdbRating}</p>
            </div>
            <div className="flex flex-row justify-between px-8 py-5 my-2 border-b border-gray-300 rounded">
              <p className="text-sm italic text-gray-400">IMDB Votes</p>
              <p className="font-italic text-sm">{state?.imdbVotes}</p>
            </div>
          </div>
        </section>
      )}
    </AuthPagesLayout>
  );
};

export default MovieDetails;
