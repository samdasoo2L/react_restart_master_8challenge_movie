import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getComingSoon,
  getMovie,
  getNowPlaying,
  getPopular,
  IGetMovie,
  IGetMovieInfo,
  makeBgPath,
  makeImagePath,
} from "../api";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useState } from "react";

const MainBox = styled(motion.div)`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 180px;
  padding: 0px 50px;
  gap: 20px;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MovieBox = styled(motion.div)`
  width: 200px;
  height: 350px;
  margin-bottom: 40px;
`;
const MovieImg = styled(motion.div)<{ bgPhoto: string }>`
  width: 200px;
  height: 300px;
  border-radius: 20px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  transform-origin: bottom center;
`;
const MovieName = styled.div`
  text-align: center;
  font-size: 20px;
  color: white;
`;
const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #444444;
  border-radius: 15px;
  overflow: hidden;
`;
const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 500vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigCover = styled.img`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  transform: scale(1.01);
`;

const BigTitle = styled.h3`
  color: white;
  font-size: 30px;
  margin: 0px 10px 10px 10px;
`;

const BigdeOver = styled.p`
  color: white;
  font-size: 20px;
  margin: 5px 10px 10px 10px;
  font-weight: bolder;
`;
const Bigdetail = styled.p`
  color: white;
  margin: 2px 10px;
`;

const mainBoxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "tween",
      duration: 0.5,
      bounce: 0.1,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};
const movieBoxVariants = {
  start: {
    scale: 0,
    y: 0,
  },
  end: {
    scale: 1,
    y: 0,
    transition: {},
  },
};

const MovieImgVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -20,
    transition: {
      delay: 0.2,
      duaration: 0.1,
      type: "tween",
    },
  },
};

function NowPlay() {
  const [movieIdNum, setMovieIdNum] = useState(1022789);
  const history = useHistory();
  const { data, isLoading } = useQuery<IGetMovie>(
    ["movies", "getComingSoon"],
    getNowPlaying
  );
  const { data: movieData, isLoading: movieLoading } = useQuery<IGetMovieInfo>(
    ["movies", movieIdNum],
    () => getMovie(movieIdNum)
  );
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/now/:movieId");
  const { scrollY } = useScroll();
  const onOverLayClick = () => history.push("/now-playing");
  const onBoxClicked = (movieId: number) => {
    history.push(`/now/${movieId}`);
    setMovieIdNum(movieId);
  };
  return (
    <MainBox variants={mainBoxVariants} initial="start" animate="end">
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {data?.results.map((movie) => (
            <MovieBox key={movie.id} variants={movieBoxVariants}>
              <MovieImg
                bgPhoto={makeImagePath(movie.backdrop_path)}
                variants={MovieImgVariants}
                layoutId={movie.id + ""}
                whileHover="hover"
                initial="normal"
                transition={{ type: "tween" }}
                onClick={() => onBoxClicked(movie.id)}
              />
              <MovieName>{movie.title}</MovieName>
            </MovieBox>
          ))}
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverLayClick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  style={{
                    top: scrollY.get() + 100,
                  }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {movieData && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeBgPath(
                            movieData.poster_path
                          )})`,
                        }}
                      />
                      <BigTitle>{movieData.title}</BigTitle>
                      <BigdeOver>{`${movieData.overview.slice(
                        0,
                        80
                      )}...`}</BigdeOver>
                      <Bigdetail>{`Budget : $${movieData.budget}`}</Bigdetail>
                      <Bigdetail>{`Runtime : ${movieData.runtime} minutes`}</Bigdetail>
                      <Bigdetail>{`Release Date : ${movieData.release_date}`}</Bigdetail>
                      <Bigdetail>{`Vote Average : ${movieData.vote_average}`}</Bigdetail>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </MainBox>
  );
}

export default NowPlay;
