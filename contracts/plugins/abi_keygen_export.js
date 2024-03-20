const { subtask } = require("hardhat/config");
const { HardhatPluginError } = require("hardhat/plugins");
const { execFileSync } = require("child_process");
const path = require("path");

const PLUGIN_NAME = "abigen-exporter";

subtask("export-abi-group").setAction(async (args, { runSuper }) => {
    await runSuper(args);

    const script = path.join(__dirname, "../../dkg/scripts/abigen.sh");

    try {
        execFileSync(script);
        console.log("ABI export successful.");
    } catch (err) {
        throw new HardhatPluginError(PLUGIN_NAME, "abigen script failed", err);
    }
});
