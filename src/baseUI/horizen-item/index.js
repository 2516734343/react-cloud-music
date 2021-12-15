import React, { useRef, useEffect } from "react";
import { PropTypes } from 'prop-types';
import Scroll from "../scroll";
import { List, ListItem } from "./style";


function Horizen(props) {

  const { list, oldVal, title } = props;
  const { handleClick } = props;

  // 加入声明
  const Category = useRef(null);

  // 加入初始化内容宽度的逻辑
  useEffect(() => {
    let categoryDOM = Category.current;
    let tagElems = categoryDOM.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction={"horizental"}>
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map((item) => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => handleClick(item.key)}>
                  {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  );
}

Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null,
}

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
}


export default React.memo(Horizen);


