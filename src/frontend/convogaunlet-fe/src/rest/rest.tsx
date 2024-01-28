export async function getGestures() {
    const res = await fetch("/base-rest/gestures", { method: "GET" });
    return await res.json();
}

export async function postGesture(gesture: string, sentence: string) {
    console.log(gesture);

    const res = await fetch("/base-rest/gestures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            gesture: gesture,
            sentence: sentence,
        }),
    });
    return await res.json();
}

export async function deleteGesture(gesture: string) {
    const res = await fetch("/base-rest/gestures", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            gesture: gesture,
        }),
    });

    return await res.json();
}