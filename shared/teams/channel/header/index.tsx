import * as React from 'react'
import * as ChatTypes from '../../../constants/types/chat2'
import * as Types from '../../../constants/types/teams'
import * as Kb from '../../../common-adapters'
import * as Styles from '../../../styles'

export type Props = {
  canChat: boolean
  canDeleteChannel: boolean
  canEditDescription: boolean
  canManageMembers: boolean
  canRenameChannel: boolean
  channelname: string
  conversationIDKey: ChatTypes.ConversationIDKey
  description: string
  isActive: boolean
  memberCount: number
  recentMemberCount: number
  role: Types.MaybeTeamRoleType
  teamID: Types.TeamID
  teamname: Types.Teamname
  onChat: () => void
} & Kb.OverlayParentProps

const _ChannelHeader = (props: Props) => {
  return (
    <Kb.Box style={styles.container}>
      <Kb.Box style={styles.channelHeader}>
        {/* Summary */}

        {/* Description */}
        {props.canEditDescription || props.description ? (
          <Kb.Text
            center={true}
            className={Styles.classNames({'hover-underline': props.description})}
            style={Styles.collapseStyles([
              styles.description,
              Styles.platformStyles({
                common: {
                  color: props.description ? Styles.globalColors.black : Styles.globalColors.black_20,
                },
                isElectron: {
                  ...(props.description ? Styles.desktopStyles.editable : Styles.desktopStyles.clickable),
                },
              }),
            ])}
            type={props.canEditDescription ? 'BodySecondaryLink' : 'Body'}
          >
            {props.description || (props.canEditDescription && 'Write a brief description')}
          </Kb.Text>
        ) : (
          <Kb.Box />
        )}

        {/* Actions */}
        <Kb.ButtonBar direction="row" style={styles.buttonBar}>
          {props.canChat && (
            <Kb.Button label="Chat" onClick={props.onChat}>
              <Kb.Icon
                type="iconfont-chat"
                style={styles.chatIcon}
                color={Styles.globalColors.whiteOrWhite}
              />
            </Kb.Button>
          )}
          {props.canManageMembers && (
            <Kb.Button
              type="Default"
              mode="Secondary"
              label="Add people"
              ref={Styles.isMobile ? undefined : props.setAttachmentRef}
              onClick={props.toggleShowingMenu}
            />
          )}
        </Kb.ButtonBar>

        {/* CLI hint */}
        {!Styles.isMobile && (
          <Kb.InfoNote>
            <Kb.Text type="BodySmall">You can also manage teams from the terminal:</Kb.Text>
            <Kb.Text type="TerminalInline" selectable={true} style={styles.cliTerminalText}>
              keybase team --help
            </Kb.Text>
          </Kb.InfoNote>
        )}
      </Kb.Box>
    </Kb.Box>
  )
}

const ChannelHeader = Kb.OverlayParentHOC(_ChannelHeader)

const styles = Styles.styleSheetCreate(
  () =>
    ({
      addYourselfBanner: {
        ...Styles.globalStyles.flexBoxColumn,
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: Styles.globalColors.blue,
        justifyContent: 'center',
        marginBottom: Styles.globalMargins.tiny,
        minHeight: 40,
        paddingBottom: Styles.globalMargins.tiny,
        paddingLeft: Styles.globalMargins.medium,
        paddingRight: Styles.globalMargins.medium,
        paddingTop: Styles.globalMargins.tiny,
      },
      addYourselfBannerText: {color: Styles.globalColors.white},
      buttonBar: Styles.platformStyles({
        isMobile: {
          marginBottom: -8,
          width: 'auto',
        },
      }),
      channelHeader: Styles.platformStyles({
        common: {
          ...Styles.globalStyles.flexBoxColumn,
          alignItems: 'center',
          paddingLeft: Styles.globalMargins.medium,
          paddingRight: Styles.globalMargins.medium,
          paddingTop: Styles.globalMargins.tiny,
        },
        isElectron: {
          paddingTop: Styles.globalMargins.medium,
          textAlign: 'center',
        },
      }),
      chatIcon: {
        marginRight: 8,
      },
      cliTerminalText: {
        marginLeft: Styles.globalMargins.xtiny,
        marginTop: Styles.globalMargins.xtiny,
      },
      container: {
        ...Styles.globalStyles.flexBoxColumn,
        alignItems: 'center',
        flex: 1,
        height: '100%',
        position: 'relative',
        width: '100%',
      },
      description: {
        maxWidth: 560,
        paddingTop: Styles.globalMargins.tiny,
      },
      meta: {
        alignSelf: 'center',
        marginLeft: Styles.globalMargins.tiny,
      },
    } as const)
)

export {ChannelHeader}
