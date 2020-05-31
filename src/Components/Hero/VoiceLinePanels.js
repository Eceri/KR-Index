import React from 'react'

export const VoiceLinePanel = props => {
    let { heroPath, voiceLines, languageKey } = props;
    return <div className="flexBox voiceContainer">
        {voiceLines.map(voiceLine => (
            <figure className="fig" key={voiceLine}>
                <figcaption>{voiceLine}</figcaption>
                <audio
                    controls
                    src={require(`./../../Assets/${heroPath}voice/${languageKey}/${voiceLine}.wav`)}
                    preload={"none"} />
            </figure>
        ))}
    </div>
}