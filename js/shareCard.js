/* ==========================================
   ESCAPE ROOM - SHARECARD.JS
   Generates a downloadable result image
========================================== */

const ShareCard = {

    dataUrl: null,

    generate() {

        const canvas = document.createElement("canvas");

        canvas.width = 1000;
        canvas.height = 600;

        const ctx = canvas.getContext("2d");

        // Background
        const grad = ctx.createLinearGradient(0, 0, 1000, 600);
        grad.addColorStop(0, "#07131f");
        grad.addColorStop(1, "#0d2438");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1000, 600);

        // Glow border
        ctx.strokeStyle = "#00e5ff";
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, 960, 560);

        // Title
        ctx.fillStyle = "#00e5ff";
        ctx.font = "bold 54px Arial";
        ctx.textAlign = "center";
        ctx.shadowColor = "#00e5ff";
        ctx.shadowBlur = 20;
        ctx.fillText("🎉 I ESCAPED THE ROOM!", 500, 130);
        ctx.shadowBlur = 0;

        const score = (typeof Game !== "undefined")
            ? Game.score + (Game.level * 500)
            : 0;

        const level = (typeof Game !== "undefined") ? Game.level : 1;

        const timeLeft = (typeof GameState !== "undefined" &&
            typeof formatTime === "function")
            ? formatTime(Math.max(0, GameState.timer.time))
            : "--:--";

        const hintsUsed = (typeof GameState !== "undefined")
            ? (GameState.player.hintsUsed || 0)
            : 0;

        const unlocked = (typeof Achievements !== "undefined")
            ? Achievements.unlocked
            : [];

        // Stat blocks
        ctx.textAlign = "left";
        ctx.font = "bold 30px Arial";
        ctx.fillStyle = "#ffffff";

        const stats = [
            ["⭐ Final Score", score],
            ["🎚 Level Reached", "Lv. " + level],
            ["⏱ Time Left", timeLeft],
            ["💡 Hints Used", hintsUsed]
        ];

        let y = 220;

        stats.forEach(([label, value]) => {

            ctx.fillStyle = "#9fd8e6";
            ctx.font = "26px Arial";
            ctx.fillText(label, 80, y);

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 30px Arial";
            ctx.textAlign = "right";
            ctx.fillText(String(value), 920, y);
            ctx.textAlign = "left";

            y += 55;

        });

        // Achievements row
        ctx.fillStyle = "#9fd8e6";
        ctx.font = "26px Arial";
        ctx.fillText("🏆 Achievements Unlocked", 80, y + 20);

        let iconX = 80;
        const iconY = y + 70;

        if (unlocked.length === 0) {

            ctx.fillStyle = "#6b8a97";
            ctx.font = "24px Arial";
            ctx.fillText("None this run", 80, iconY + 10);

        } else {

            ctx.font = "44px Arial";

            unlocked.slice(0, 10).forEach(id => {

                const ach = Achievements.list[id];

                if (!ach) return;

                ctx.fillText(ach.icon, iconX, iconY + 20);

                iconX += 70;

            });

        }

        // Footer
        ctx.textAlign = "center";
        ctx.fillStyle = "#4fb8cc";
        ctx.font = "22px Arial";
        ctx.fillText("Play it yourself → Escape Room", 500, 555);

        this.dataUrl = canvas.toDataURL("image/png");

        return this.dataUrl;

    },

    open() {

        const dataUrl = this.generate();

        const modal = document.getElementById("shareModal");
        const img = document.getElementById("shareCardImage");
        const downloadBtn = document.getElementById("downloadShareCard");

        if (img) img.src = dataUrl;

        if (downloadBtn) {

            downloadBtn.onclick = () => this.download();

        }

        const nativeBtn = document.getElementById("nativeShareCard");

        if (nativeBtn) {

            nativeBtn.style.display =
                (navigator.share && navigator.canShare) ? "inline-block" : "none";

            nativeBtn.onclick = () => this.nativeShare();

        }

        if (modal) modal.classList.remove("hidden");

    },

    close() {

        const modal = document.getElementById("shareModal");

        if (modal) modal.classList.add("hidden");

    },

    download() {

        if (!this.dataUrl) this.generate();

        const link = document.createElement("a");

        link.href = this.dataUrl;
        link.download = "escape-room-result.png";
        link.click();

    },

    async nativeShare() {

        try {

            if (!this.dataUrl) this.generate();

            const res = await fetch(this.dataUrl);
            const blob = await res.blob();
            const file = new File([blob], "escape-room-result.png", { type: "image/png" });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {

                await navigator.share({
                    files: [file],
                    title: "Escape Room",
                    text: "I just escaped the room! 🎉"
                });

            }

        } catch (err) {

            console.log("Share cancelled or failed:", err);

        }

    }

};

document.addEventListener("DOMContentLoaded", () => {

    const shareBtn = document.getElementById("shareResultBtn");

    if (shareBtn) {

        shareBtn.onclick = () => ShareCard.open();

    }

    const closeShare = document.getElementById("closeShareModal");

    if (closeShare) {

        closeShare.onclick = () => ShareCard.close();

    }

});
