import React from "react";

export class TravelFallback extends React.Component<
    { children: React.ReactNode; fallback: React.ReactNode },
    { failed: boolean }
> {
    state = { failed: false };
    static getDerivedStateFromError() {
        return { failed: true };
    }
    render() {
        return this.state.failed ? this.props.fallback : this.props.children;
    }
}

export const supportsWebGL = () => {
    try {
        const canvas = document.createElement("canvas");
        const context =
            canvas.getContext("webgl2") || canvas.getContext("webgl");
        context?.getExtension("WEBGL_lose_context")?.loseContext();
        return Boolean(context);
    } catch {
        return false;
    }
};
