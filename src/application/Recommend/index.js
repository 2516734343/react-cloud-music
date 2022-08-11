import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import { Content } from './style';
import Scroll from '../../baseUI/scroll';
import * as actionTypes from './store/actionCreator'
import { toJS } from 'immutable';
import { forceCheck } from "react-lazyload";
import Loading from '../../baseUI/loading';

function Recommend(props) {

  const { bannerList, recommendList, enterLoading } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }

    if (!recommendList.size) {
      console.log(recommendList.size);
      getRecommendListDataDispatch();
    }
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  console.log(recommendListJS, enterLoading);

  return (
    <Content>
      {
        enterLoading ? <Loading></Loading> : null
      }
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>
    </Content>

  )
}
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])//简单数据类型不需要调用toJS
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
