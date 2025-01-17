import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js'
import { Command } from '@structures'
import { CommandType, Image, Url } from 'enums'

export default new Command({
  data: new SlashCommandBuilder()
    .setName('supportserver')
    .setDescription("Provides a link to the bot's support server."),
  type: CommandType.Information,
  run: async (client, interaction): Promise<void> => {
    const { user, guild } = interaction
    const { member } = Command.getMember(interaction)

    const embed = new EmbedBuilder()
      .setTitle('Support Server')
      .setThumbnail(Image.Calypso)
      .setColor(
        guild?.members.me?.displayHexColor ??
          client.user.hexAccentColor ??
          null,
      )
      .setDescription(
        `Click [here](${Url.SupportServer}) to join my support server!`,
      )
      .setFooter({
        text: member?.displayName ?? user.username,
        iconURL: member?.displayAvatarURL() ?? user.displayAvatarURL(),
      })
      .setTimestamp()

    const row = new ActionRowBuilder<ButtonBuilder>().setComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(Url.Invite)
        .setLabel('Invite Me'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(Url.GithubRepository)
        .setLabel('GitHub'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(Url.Donate)
        .setLabel('Donate'),
    )

    await client.reply(interaction, { embeds: [embed], components: [row] })
  },
})
