const TailwindExample = () => {
    return (
        <>
            <div className={"grid place-content-center h-80"}>
                <p className={"line-through"}>Spend hours on CSS</p> <p className={"underline"}>Use Tailwind</p>
                <p className="text-sky-400/100">The quick brown fox...</p>
                <p className="text-sky-400/75">The quick brown fox...</p>
                <p className="text-sky-400/50">The quick brown fox...</p>
                <p className="text-sky-400/25">The quick brown fox...</p>
                <p className="text-sky-400/0">The quick brown fox...</p>
            </div>
        </>
    )
}
export default TailwindExample;