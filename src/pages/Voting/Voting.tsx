
import React from 'react';
import { VoitingType } from '../../types';
import VotingReady from '../../components/VotingReady/VotingReady';
import VotingNotReady from '../../components/VotingNotReady/VotingNotReady';

type Props = {
	match: {
		params: {
			id: string
		}
	},
	voting: VoitingType
}

const Voting: React.FC<Props> = ({ voting, match }) => {

	return voting ? <VotingReady match={match} voting={voting} /> : <VotingNotReady match={match} />;
};

export default Voting;