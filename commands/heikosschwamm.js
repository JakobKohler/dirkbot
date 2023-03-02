const { SlashCommandBuilder } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('heikosschwamm')
    .setDescription('Delete n messages with the power of the Heiko-sponge')
    .addIntegerOption(option => 
        option.setName('int')
        .setDescription('How many messages should be deleted')
        .setRequired(true)),
    async execute(interaction) {
        let amount = interaction.options.getInteger('int');

        if(isNaN(amount) || amount < 1) {
            return interaction.reply({ content: "Please use a valid amount between 1 and 99"});
        }

        if(parseInt(amount) > 99) {
            return interaction.reply({ content: "Only 99 messages can be deleted at once"});
        } else {
            try {
            let { size } = await interaction.channel.bulkDelete(amount);
            await interaction.reply({ content: ':sweat_drops: :sweat_drops: :sweat_drops: :sweat_drops: :sweat_drops: :sweat_drops: :sweat_drops: :sweat_drops: :sweat_drops: :sweat_drops: :sweat_drops: :sweat_drops: :sweat_drops: :sweat_drops:' });
            await wait(4000);
            await interaction.deleteReply();
            } catch(e) {
            console.log(e)
            interaction.reply({ content: "Only messages that are newer than 14 days can be deleted", ephemeral: true });
            }
        }
    }
}