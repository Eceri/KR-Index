import React from 'react'

export const VoiceLinePanel = props => {
    let { heroPath, voiceLines, languageKey } = props;
    return <div>
        {voiceLines.map(voiceLine => (
            <figure className="fig" key={voiceLine}>
                <figcaption className="figCaption">{voiceLine}</figcaption>
                <audio
                    controls
                    src={require(`./../../Assets/${heroPath}voice/${languageKey}/${voiceLine}.wav`)}
                    preload={"none"} />
            </figure>
        ))}
    </div>
}