import { usePlayerSotre } from "@/store/playerStore";
import { Slider } from "@/components/Slider";
import { useEffect, useRef } from "react";

export const Play = () => (
    <svg
        role="img"
        width="16"
        height="16"
        aria-hidden="true"
        viewBox="0 0 16 16"
    >
        <path
            d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
        ></path>
    </svg>
);

export const Pause = () => (
    <svg
        role="img"
        width="16"
        height="16"
        aria-hidden="true"
        viewBox="0 0 16 16"
    >
        <path
            d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
        ></path>
    </svg>
);

const CurrentSong = ({ image, title, artists }) => {
    return (
        <div className="flex items-center gap-5 relative overflow-hidden">
            <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
                <img src={image} alt={title} />
            </picture>

            <div className="flex flex-col">
                <h3 className="font-semibold text-sm block">
                    {title}
                </h3>
                <span className="text-xs opacity-80">
                    {artists?.join(', ')}
                </span>
            </div>
        </div>
    )
}

const Player = () => {

    const { currentMusic, isPlaying, setIsPlaying } = usePlayerSotre(state => state);
    const audioRef = useRef();
    const volumeRef = useRef(1);

    useEffect(() => {
        isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }, [isPlaying]);

    useEffect(() => {
        const { song, playlist, songs } = currentMusic;
        if (song) {
            const src = `/music/${playlist?.id}/0${song.id}.mp3`;
            audioRef.current.src = src;
            audioRef.current.volume = volumeRef.current;
            audioRef.current.play();
        }
    }, [currentMusic]);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    }

    return (
        <div className="flex flex-grow justify-between w-full px-4 z-50">
            <div>
                <CurrentSong {...currentMusic.song} />
            </div>

            <div className="grid place-content-center gap-4 flex-1">
                <div className="flex justify-center">
                    <button className="p-2 bg-white rounded-full" onClick={handleClick}>
                        {isPlaying ? <Pause /> : <Play />}
                    </button>
                </div>
            </div>

            <div className="grid place-content-center">
                <Slider
                    defaultValue={[40]}
                    max={100}
                    min={0}
                    className="w-[95px]"
                    onValueChange={(value) => {
                        const [newValue] = value;
                        const volumeValue = newValue / 100;
                        volumeRef.current = volumeValue;
                        audioRef.current.volume = volumeValue;
                    }}
                />
            </div>

            <audio ref={audioRef} />
        </div>
    );
};

export default Player;
