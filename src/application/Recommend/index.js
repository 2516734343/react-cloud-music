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
  const { getBannerDataDispatch, getRecommendListDispatch } = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }

    if (!recommendList.size) {
      getRecommendListDispatch();
    }

  }, [])


  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];


  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>
      {/* {enterLoading && <Loading />} */}
    </Content>

  )
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
})
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDispatch() {
      dispatch(actionTypes.getRecommendList())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
