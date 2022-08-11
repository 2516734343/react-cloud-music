import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import Horizen from '../../baseUI/horizen-item';
import { List, ListContainer, ListItem, NavContainer } from './style';
import { categoryTypes, alphaTypes } from '../../api/config';
import Scroll from '../../baseUI/scroll';
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/actionCreator';
import { useEffect } from 'react';
import Loading from '../../baseUI/loading';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { CategoryDataContext, CHANGE_ALPHA, CHANGE_CATEGORY } from './data';

function Singers(props) {

  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;

  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;


  // let [category, setCategory] = useState('');
  // let [alpha, setAlpha] = useState('');

  const { data, dispatch } = useContext(CategoryDataContext);
  const { category, alpha } = data.toJS();
  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch();
    }

  }, [])

  let handleUpdateAlpha = (val) => {
    // setAlpha(val);
    dispatch({ type: CHANGE_ALPHA, data: val });
    updateDispatch(category, val);
  };

  let handleUpdateCatetory = (val) => {
    // setCategory(val);
    dispatch({ type: CHANGE_CATEGORY, data: val });
    updateDispatch(val, alpha);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  }
  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  }

  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : [];
    console.log(list);
    return (
      <List>
        {
          list.map((singer, index) => {
            return <ListItem key={singer.accountId + "" + index}>
              <div className="img_wrapper">
                {/* <LazyLoad placeholder={<img width={'100%'} height={'100%'} src={require('./singer.png')} alt={'music'} />}> */}
                <img src={`${singer.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                {/* </LazyLoad> */}
              </div>
              <span className="name">{singer.name}</span>
            </ListItem>
          })
        }
      </List>
    )
  }

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={"分类 (默认热门):"}
          handleClick={(val) => handleUpdateCatetory(val)}
          oldVal={category} />
        <Horizen
          list={alphaTypes}
          title={"首字母:"}
          handleClick={val => handleUpdateAlpha(val)}
          oldVal={alpha} />
      </NavContainer>
      <ListContainer>
        <Scroll
          // forceCheck={forceCheck}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingerList()}
        </Scroll>
        <Loading show={enterLoading} />
      </ListContainer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
})
const mapDispatchToProps = (dispatch) => {
  return {

    getHotSingerDispatch() {
      console.log('getHotSingerDispatch');
      dispatch(getHotSingerList());
    },

    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },

    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
