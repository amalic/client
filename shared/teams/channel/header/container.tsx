import * as Container from '../../../util/container'
import * as Constants from '../../../constants/teams'
import * as Chat2Gen from '../../../actions/chat2-gen'
import * as ChatTypes from '../../../constants/types/chat2'
import * as Types from '../../../constants/types/teams'
import {ChannelHeader} from '.'

export type OwnProps = {
  teamID: Types.TeamID
  conversationIDKey: ChatTypes.ConversationIDKey
}

export default Container.connect(
  (state, {teamID, conversationIDKey}: OwnProps) => {
    const yourOperations = Constants.getCanPerformByID(state, teamID)
    const {teamname} = Constants.getTeamMeta(state, teamID)
    const {channelname, description, numParticipants} = Constants.getChannelInfoFromConvID(
      state,
      teamID,
      conversationIDKey
    ) ?? {channelname: '', description: '', numParticipants: 0}
    return {
      _you: state.config.username,
      canChat: yourOperations.chat,
      canDeleteChannel: yourOperations.deleteChannel,
      canEditDescription: yourOperations.editChannelDescription,
      // TODO: check if this should be doable by writers too
      canManageMembers: yourOperations.manageMembers,
      canRenameChannel: yourOperations.renameChannel,
      channelname,
      description,
      isActive: true, // TODO: populate
      memberCount: numParticipants,
      recentMemberCount: 2, // TODO: populate
      role: Constants.getRole(state, teamID),
      teamname,
    }
  },
  dispatch => ({
    _onChat: (conversationIDKey: ChatTypes.ConversationIDKey) =>
      dispatch(Chat2Gen.createPreviewConversation({conversationIDKey, reason: 'channelHeader'})),
  }),
  (stateProps, dispatchProps, ownProps: OwnProps) => ({
    canChat: stateProps.canChat,
    canDeleteChannel: stateProps.canDeleteChannel,
    canEditDescription: stateProps.canEditDescription,
    canManageMembers: stateProps.canManageMembers,
    canRenameChannel: stateProps.canRenameChannel,
    channelname: stateProps.channelname,
    conversationIDKey: ownProps.conversationIDKey,
    description: stateProps.description,
    isActive: stateProps.isActive,
    memberCount: stateProps.memberCount,
    onChat: () => dispatchProps._onChat(ownProps.conversationIDKey),
    recentMemberCount: stateProps.recentMemberCount,
    role: stateProps.role,
    teamID: ownProps.teamID,
    teamname: stateProps.teamname,
  })
)(ChannelHeader)
