import React from "react";
import "./../styles/HeroVoice.css"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { VoiceLinePanel } from "./VoiceLinePanels"

export const HeroVoice = props => {
  let { heroPath, voice } = props;
  let voiceLines = voice.lines;
  return (
    <div>
      <div>
        <p className="title2">Voice Actor</p>
        <table>
          <tbody>
            <tr>
              <td className="languageTd">Japanese</td><td>{voice.actor.jp}</td>
            </tr>
            <tr>
              <td className="languageTd">Korean</td><td>{voice.actor.kr}</td>
            </tr>
            <tr>
              <td className="languageTd">English</td><td>{voice.actor.en}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Tabs>
        <TabList>
          <Tab>Japanese</Tab>
          <Tab>Korean</Tab>
          <Tab>English</Tab>
        </TabList>
        <TabPanel>
          <VoiceLinePanel heroPath={heroPath} voiceLines={voiceLines.jp} languageKey="jp" />
        </TabPanel>
        <TabPanel>
          <VoiceLinePanel heroPath={heroPath} voiceLines={voiceLines.kr} languageKey="kr" />
        </TabPanel>
        <TabPanel>
          <VoiceLinePanel heroPath={heroPath} voiceLines={voiceLines.en} languageKey="en" />
        </TabPanel>
      </Tabs>
    </div>
  );
};
