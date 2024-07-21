import { motion } from "framer-motion";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  top: 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
  margin: 50px 0px;
`;
const Item = styled.li`
  margin-right: 20px;
  color: white;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
  font-weight: bolder;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  bottom: -20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: red;
`;

function Header() {
  const homeMatch = useRouteMatch("/");
  const nowMatch = useRouteMatch("/now-playing");
  const comingMatch = useRouteMatch("/coming-soon");
  return (
    <Nav>
      <Items>
        <Item>
          <Link to="/">
            POPULAR {homeMatch?.isExact && <Circle layoutId="circle" />}
          </Link>
        </Item>
        <Item>
          <Link to="/coming-soon">
            COMING SOON {comingMatch?.isExact && <Circle layoutId="circle" />}
          </Link>
        </Item>
        <Item>
          <Link to="/now-playing">
            NOW PLAYING {nowMatch?.isExact && <Circle layoutId="circle" />}
          </Link>
        </Item>
      </Items>
    </Nav>
  );
}
export default Header;
