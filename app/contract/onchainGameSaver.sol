// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameScores {
    struct Game {
        string orgName;
        string gameName;
        address player;
        uint256 score;
    }

    // Array to store all games
    Game[] public games;

    // Event for when a new game is added
    event GameAdded(
        string orgName,
        string gameName,
        address indexed player,
        uint256 score
    );

    /**
     * @dev Adds a new game to the blockchain.
     * @param _orgName Name of the organization.
     * @param _gameName Name of the game.
     * @param _score Player's score.
     */
    function addGame(
        string memory _orgName,
        string memory _gameName,
        uint256 _score
    ) public {
        games.push(Game(_orgName, _gameName, msg.sender, _score));
        emit GameAdded(_orgName, _gameName, msg.sender, _score);
    }

    /**
     * @dev Gets the details of a specific game.
     * @param _index Index of the game in the array.
     * @return orgName Name of the organization.
     * @return gameName Name of the game.
     * @return player Address of the player.
     * @return score Player's score.
     */
    function getGame(uint256 _index)
        public
        view
        returns (
            string memory orgName,
            string memory gameName,
            address player,
            uint256 score
        )
    {
        Game memory game = games[_index];
        return (game.orgName, game.gameName, game.player, game.score);
    }

    /**
     * @dev Gets the total number of games.
     * @return Total number of games.
     */
    function getGameCount() public view returns (uint256) {
        return games.length;
    }
}
