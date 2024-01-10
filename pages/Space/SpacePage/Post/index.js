import { POST_TYPE } from '../../../../constants';
import Editor from './Editor';
import FilePost from './FilePost';
import VideoPost from './VideoPost.';
import ImagePost from './ImagePost';
import Poll from './Poll';

const ComponentMap = {
  [POST_TYPE.EDITOR]: Editor,
  [POST_TYPE.FILE]: FilePost,
  [POST_TYPE.VIDEO]: VideoPost,
  [POST_TYPE.IMAGE]: ImagePost,
  [POST_TYPE.POLL]: Poll,
}

export default function Post({ post, showModal }) {
  const {
    type,
  } = post;
  const Component = ComponentMap[type];
  return (
    <Component post={post} showModal={showModal} />
  )
}
