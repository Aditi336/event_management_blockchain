async function main() {
    const Event_ord = await ethers.getContractFactory("Event_ord"); // Contract factory
    const event_ord = await Event_ord.deploy(); // Deploy instance

    // await event_ord.deployed(); // Corrected line
    console.log(`Event Manager contract deployed at: ${event_ord.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
