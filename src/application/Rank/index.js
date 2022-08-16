import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux'
import Loading from '../../baseUI/loading';
import { getRankList } from './store'
import { filterIndex, filterIdx } from '../../api/utils';
import {
  List,
  ListItem,
  SongList,
  Container
} from './style';
import Scroll from '../../baseUI/scroll/index';
import { EnterLoading } from './../Singers/style';
import { renderRoutes } from 'react-router-config';

function Rank(props) {
  const { rankList: list, loading } = props;
  const { getRankListData } = props;
  useEffect(() => {
    if (!rankList.size) {
      getRankListData();
    }
  }, [])
  let rankList = list ? list.toJS() : [];

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const enterDetail = (name) => {
    const idx = filterIdx(name);
    if (idx === null) {
      alert("暂无相关数据");
      return;
    }
  }
  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item) => {
            return (
              <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item.name)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt="" />
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  let displayStyle = loading ? { "display": "none" } : { "display": "" };
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>全球榜</h1>
          {renderRankList(globalList, true)}
          {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListData() {
      dispatch(getRankList());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
