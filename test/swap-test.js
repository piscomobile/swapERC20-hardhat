const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Proposal Test Cases", function () {
  let swap;
  let tokenA;
  let tokenB;
  
  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const TokenA = await hre.ethers.getContractFactory("TokenA");
    tokenA = await TokenA.deploy();
    await tokenA.deployed();
    await tokenA.mint(addr1.address,10);
    console.log("TokenA:", tokenA.address);

    const TokenB = await hre.ethers.getContractFactory("TokenB");
    tokenB = await TokenB.deploy();
    await tokenB.deployed();
    await tokenB.mint(addr2.address,10);
    console.log("TokenB:", tokenB.address);

    // We get the contract to deploy
    const Swap = await hre.ethers.getContractFactory("Swapper");
    swap = await Swap.deploy(tokenA.address , addr1.address , 4 ,tokenB.address , addr2.address , 1  );
    await swap.deployed();
    console.log("Swap:", swap.address);
    await tokenA.connect(addr1).approve(swap.address , 10);
    await tokenB.connect(addr2).approve(swap.address , 10);
    let cant = await tokenA.allowance(addr1.address,swap.address);
    let cant2 = await tokenB.allowance(addr2.address, swap.address);
    console.log("Los addr1 y addr2 permitieron que el swap disponga 10");
    console.log(cant.toNumber());
    console.log(cant2.toNumber());
    
  });


  it("check  swap", async function () {
    [owner, addr1] = await ethers.getSigners();
    console.log(owner.address);
    await swap.connect(addr1).swap();
    console.log("Balances de addr1 en TokenA y TokenB");
    let val= await tokenA.balanceOf(addr1.address);
    let val2=await tokenB.balanceOf(addr1.address);

    console.log(val.toNumber());
    console.log(val2.toNumber());

    console.log("Balances de addr2 en TokenA y TokenB");
    let val3= await tokenA.balanceOf(addr2.address);
    let val4=await tokenB.balanceOf(addr2.address);

    console.log(val3.toNumber());
    console.log(val4.toNumber());

    
    //expect(await tokenA.balanceOf(addr1.address)).to.equal(4);
    
  });

  /*it("get balance of swap equal to 10", async function () {
    [owner, addr1] = await ethers.getSigners();
    let balance = await swap.getBalance(swap.address);
    expect(balance).to.equal(10);
    
  });*

/*  it("Should return the amount of proposal created", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.connect(owner).createProposal("Proposal Title", "Proposal Body");
    await proposalContract.connect(owner).createProposal("Proposal Title 2", "Proposal Body 2");

    let proposalsQty = await proposalContract.proposalsLength();

    expect(proposalsQty).to.equal(2);
  });

  it("Should create a new thread on chain asociated", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");

    const proposal = await proposalContract.proposals(0);
    const thread = await forumContract.threads(Math.floor(proposal.threadId));

    expect(thread.title).to.equal("Proposal Title");
    expect(thread.body).to.equal("Proposal Body");
  });

  it("Should discarted a proposal in state Pending aproval", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");

    let proposal = await proposalContract.proposals(0);
    expect(proposal.status).to.equal(0);
    await proposalContract.connect(addr1).discardProposal(0);
    proposal = await proposalContract.proposals(0);
    expect(proposal.status).to.equal(8);
  });

  it("Should NOT change status to voting if the in discussion due date has not passed yet ", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");

    await proposalContract.connect(addr1).approveProposal(0, 10);
    await expect(proposalContract.connect(addr1).toVotingProposal(0)).to.be.revertedWith(
      "The in discussion due date has not passed yet.",
    );
  });

  it("Should NOT change status to voting if the status in not In Disussion", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");

    await expect(proposalContract.connect(addr1).toVotingProposal(0)).to.be.revertedWith(
      "The proposal status should be In Discussion",
    );
  });

  it("Should NOT discarted a proposal in state Pending aproval if the address is not admin", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");

    let proposal = await proposalContract.proposals(0);
    expect(proposal.status).to.equal(0);
    await expect(proposalContract.discardProposal(0)).to.be.revertedWith("You do not have permissions for this action");
  });

  it("Should NOT discarted a proposal if isn't in state Pending aproval", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");

    await proposalContract.updateProposalById(
      0,
      1,
      Number.parseInt(new Date().getTime() / 1000),
      Number.parseInt(new Date().getTime() / 1000),
    );

    await expect(proposalContract.connect(addr1).discardProposal(0)).to.be.revertedWith(
      "The proposal status should be Pending approval",
    );
  });

  it("Should approve a proposal in state Pending aproval", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");
    const dateNow = new Date();
    const dateOneWeek = new Date();
    const dateThreeWeeks = new Date();
    dateOneWeek.setDate(dateNow.getDate() + 7);
    dateThreeWeeks.setDate(dateNow.getDate() + 21);

    await proposalContract.connect(addr1).approveProposal(0, 10);
    let proposal = await proposalContract.proposals(0);

    expect(proposal.status).to.equal(1);
    expect(Math.floor(proposal.inDiscussionDueDate)).to.equal(Number.parseInt(dateOneWeek.getTime() / 1000));
    expect(Math.floor(proposal.votingStageDueDate)).to.equal(Number.parseInt(dateThreeWeeks.getTime() / 1000));
  });

  it("Should NOT approve a proposal in state Pending aproval if the address is not admin", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");

    let proposal = await proposalContract.proposals(0);
    expect(proposal.status).to.equal(0);

    await expect(proposalContract.approveProposal(0, 10)).to.be.revertedWith(
      "You do not have permissions for this action",
    );
  });

  it("Should NOT approve a proposal if isn't in state Pending aproval", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");

    await proposalContract.updateProposalById(
      0,
      1,
      Number.parseInt(new Date().getTime() / 1000),
      Number.parseInt(new Date().getTime() / 1000),
    );

    await expect(proposalContract.connect(addr1).approveProposal(0, 10)).to.be.revertedWith(
      "The proposal status should be Pending approval",
    );
  });

  it("Should allow only the owner to set the forum contract address", async function () {
    const [owner, addr1] = await ethers.getSigners();

    await expect(proposalContract.connect(addr1).setForumAddress(forumContract.address)).to.be.revertedWith(
      `AccessControl: account ${addr1.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`,
    );
  });

  it("Should stake and lock reputation aligned", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.connect(owner).createProposal("Proposal Title", "Proposal Body");
    const dateTwoWeek = new Date();
    dateTwoWeek.setDate(dateTwoWeek.getDate() + 14);
    await proposalContract.updateProposalById(
      0,
      2,
      Number.parseInt(new Date().getTime() / 1000),
      Number.parseInt(dateTwoWeek.getTime() / 1000),
    );
    await proposalContract.connect(addr1).stakeReputation(0, 0, 500000);

    const reputationStakedAligned = await proposalContract.stakesAligned(0, addr1.address);
    const reputationStakedNotAligned = await proposalContract.stakesNotAligned(0, addr1.address);
    const reputationAvailbale = await reputationContract.availableReputationOf(addr1.address);

    expect(reputationStakedAligned).to.equal(500000);
    expect(reputationStakedNotAligned).to.equal(0);
    expect(reputationAvailbale).to.equal(1000000000000 - 500000);
  });

  it("Should stake and lock reputation NOT aligned", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.connect(owner).createProposal("Proposal Title", "Proposal Body");
    const dateTwoWeek = new Date();
    dateTwoWeek.setDate(dateTwoWeek.getDate() + 14);
    await proposalContract.updateProposalById(
      0,
      2,
      Number.parseInt(new Date().getTime() / 1000),
      Number.parseInt(dateTwoWeek.getTime() / 1000),
    );
    await proposalContract.connect(addr1).stakeReputation(0, 1, 500000);

    const reputationStakedAligned = await proposalContract.stakesAligned(0, addr1.address);
    const reputationStakedNotAligned = await proposalContract.stakesNotAligned(0, addr1.address);
    const reputationAvailbale = await reputationContract.availableReputationOf(addr1.address);

    expect(reputationStakedAligned).to.equal(0);
    expect(reputationStakedNotAligned).to.equal(500000);
    expect(reputationAvailbale).to.equal(1000000000000 - 500000);
  });

  it("Should not allow to stake more than 50% of reputation", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.connect(owner).createProposal("Proposal Title", "Proposal Body");
    const dateTwoWeek = new Date();
    dateTwoWeek.setDate(dateTwoWeek.getDate() + 14);
    await proposalContract.updateProposalById(
      0,
      2,
      Number.parseInt(new Date().getTime() / 1000),
      Number.parseInt(dateTwoWeek.getTime() / 1000),
    );

    await expect(proposalContract.connect(addr1).stakeReputation(0, 1, 700000000000)).to.be.revertedWith(
      "You don't have enought reputation to stake. You can't stake more than 50% of reputation",
    );
  });

  it("The OP should not stake reputation reputation on his proposal", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");
    const dateTwoWeek = new Date();
    dateTwoWeek.setDate(dateTwoWeek.getDate() + 14);
    await proposalContract.updateProposalById(
      0,
      2,
      Number.parseInt(new Date().getTime() / 1000),
      Number.parseInt(dateTwoWeek.getTime() / 1000),
    );

    await expect(proposalContract.stakeReputation(0, 0, 150)).to.be.revertedWith(
      "Owner can not stake reputation on his proposal",
    );
  });

  it("Should not allow to stake more than one time on a proposal (NOT ALIGNED vs ALIGNED)", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");
    const dateTwoWeek = new Date();
    dateTwoWeek.setDate(dateTwoWeek.getDate() + 14);
    await proposalContract.updateProposalById(
      0,
      2,
      Number.parseInt(new Date().getTime() / 1000),
      Number.parseInt(dateTwoWeek.getTime() / 1000),
    );

    await proposalContract.connect(addr1).stakeReputation(0, 1, 150);
    const reputationAvailbale = await reputationContract.availableReputationOf(addr1.address);

    await expect(proposalContract.connect(addr1).stakeReputation(0, 0, 150)).to.be.revertedWith(
      "Only one time voting is allowed",
    );
    expect(reputationAvailbale).to.equal(1000000000000 - 150);
  });

  it("Should not allow to stake more than one time on a proposal (ALIGNED vs NOT ALIGNED)", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");
    const dateTwoWeek = new Date();
    dateTwoWeek.setDate(dateTwoWeek.getDate() + 14);
    await proposalContract.updateProposalById(
      0,
      2,
      Number.parseInt(new Date().getTime() / 1000),
      Number.parseInt(dateTwoWeek.getTime() / 1000),
    );

    await proposalContract.connect(addr1).stakeReputation(0, 0, 150);
    const reputationAvailbale = await reputationContract.availableReputationOf(addr1.address);

    await expect(proposalContract.connect(addr1).stakeReputation(0, 1, 150)).to.be.revertedWith(
      "Only one time voting is allowed",
    );
    expect(reputationAvailbale).to.equal(1000000000000 - 150);
  });

  it("Should not allow to stake more than one time on a proposal (ALIGNED vs ALIGNED)", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");
    const dateTwoWeek = new Date();
    dateTwoWeek.setDate(dateTwoWeek.getDate() + 14);
    await proposalContract.updateProposalById(
      0,
      2,
      Number.parseInt(new Date().getTime() / 1000),
      Number.parseInt(dateTwoWeek.getTime() / 1000),
    );

    await proposalContract.connect(addr1).stakeReputation(0, 1, 150);
    const reputationAvailbale = await reputationContract.availableReputationOf(addr1.address);

    await expect(proposalContract.connect(addr1).stakeReputation(0, 1, 150)).to.be.revertedWith(
      "Only one time voting is allowed",
    );
    expect(reputationAvailbale).to.equal(1000000000000 - 150);
  });

  it("Should not allow to stake if is not a token holder", async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");
    const dateTwoWeek = new Date();
    dateTwoWeek.setDate(dateTwoWeek.getDate() + 14);
    await proposalContract.updateProposalById(
      0,
      2,
      Number.parseInt(new Date().getTime() / 1000),
      Number.parseInt(dateTwoWeek.getTime() / 1000),
    );

    await expect(proposalContract.connect(addr2).stakeReputation(0, 0, 150)).to.be.revertedWith(
      "You do not have tokens",
    );
  });

  it("Shouldn't retrive ballot details if votingStageDueDate is not reached ", async function () {
    await proposalContract.createProposal("Proposal Title", "Proposal Body");
    await proposalContract.connect(addr1).approveProposal(0, 10);
    await expect(proposalContract.connect(addr1).getBallotDetails(0)).to.be.revertedWith(
      "the time to voting Stage Due Date isn't reach yet",
    );
  });

 it("retrive ballot right details with votingStageDueDate reached ", async function () {
    [owner,addr1,addr2,addr3,addr4] = await ethers.getSigners();
    await tokensContract.connect(owner).mint(addr2.address, 1000000000000);
    await reputationContract.connect(owner).mint(addr2.address, 1000000000000);
    await tokensContract.connect(owner).mint(addr3.address, 1000000000000);
    await reputationContract.connect(owner).mint(addr3.address, 1000000000000);

    const inDiscuss = Number.parseInt(inDiscussionDueDate.getTime() / 1000);
    const votingStage = Number.parseInt(votingStageDueDate.getTime() / 1000);

    await proposalContract.connect(addr1).createProposalDateReached(inDiscuss,votingStage);
    await proposalContract.connect(owner).setWhitelistAddress(owner.address);
    await proposalContract.connect(addr2).stakeReputation(0, 0, 50);
    await proposalContract.connect(addr3).stakeReputation(0, 1, 40);
    await reputationContract.connect(owner).addMember(addr1.address);
    await reputationContract.connect(owner).addMember(addr2.address);
    await reputationContract.connect(owner).addMember(addr3.address);
    const [_stakeAlignedAmount,_stakeNotAlignedAmount,_userVotedOnProposal,_quorumNeeded,_inDiscussionDueDate,_votingStageDueDate]= await proposalContract.connect(addr1).getBallotDetails(0);
    await expect(Math.floor(_stakeAlignedAmount)).to.equal(50);
    await expect(Math.floor(_stakeNotAlignedAmount)).to.equal(40);
    await expect(Math.floor(_userVotedOnProposal)).to.equal(2);
    await expect(Math.floor(_quorumNeeded)).to.equal(2);
    await expect(Number.parseInt(_inDiscussionDueDate));
    await expect(Number.parseInt(_votingStageDueDate));
   
    });

  it("Should not allow to stake if the state of proposal is not voting stage", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");

    await expect(proposalContract.connect(addr1).stakeReputation(0, 0, 150)).to.be.revertedWith(
      "The proposal's state is not Voting Stage",
    );
  });

  it("Should not allow to stake if the votingStageDueDate is expired", async function () {
    [owner, addr1] = await ethers.getSigners();
    await proposalContract.createProposal("Proposal Title", "Proposal Body");
    const inDiscussionDueDate = new Date();
    inDiscussionDueDate.setDate(inDiscussionDueDate.getDate() - 14);
    const votingStageDueDate = new Date();
    votingStageDueDate.setDate(votingStageDueDate.getDate() - 7);
    await proposalContract.updateProposalById(
      0,
      2,
      Number.parseInt(inDiscussionDueDate.getTime() / 1000),
      Number.parseInt(votingStageDueDate.getTime() / 1000),
    );
    await expect(proposalContract.connect(addr1).stakeReputation(0, 0, 150)).to.be.revertedWith(
      "The due date of voting stage is expired",
    );
  });*/
});