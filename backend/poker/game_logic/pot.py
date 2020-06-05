class Pot:
    def __init__(self, size=0):
        self._size = size
        self._round_bets = {}
        self._folded_bets = {}
        self.last_bet = 0

    def handle_bet(self, player, bet):
        if not player.active:
            return

        prev_bet = self._round_bets.get(player.seat, 0)
        actual_bet = bet - prev_bet
        self._size += actual_bet
        player.bet = bet
        player.amount -= actual_bet
        self._round_bets[player.seat] = bet
        self.last_bet = bet

    def fold_bet(self, player):
        if self._round_bets.get(player.seat):
            self._folded_bets[player.seat] = self._round_bets.pop(player.seat)

    def new_round(self):
        self._round_bets = {}

    def bet_round_complete(self, num_active_players):
        round_bets = set(self._round_bets.values())
        active_player_count = len(self._round_bets)
        return len(round_bets) == 1 and active_player_count == num_active_players

    def split_pot(self, winners):
        pass

    def __repr__(self):
        return f'{self.__class__.__name__}(size={self._size})'
