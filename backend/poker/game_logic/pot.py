class Pot:
    def __init__(self, size=0):
        self.__size = size
        self.__round_bets = {}
        self.__folded_bets = {}
        self.__last_bet = 0

    @property
    def size(self):
        return self.__size

    @property
    def round_bets(self):
        return self.__round_bets

    @property
    def folded_bets(self):
        return self.__folded_bets

    @property
    def last_bet(self):
        return self.__last_bet

    def handle_bet(self, player, bet):
        if not player.active:
            return

        prev_bet = self.__round_bets.get(player.seat, 0)
        actual_bet = bet - prev_bet
        self.__size += actual_bet
        player.bet = bet
        player.amount -= actual_bet
        self.__round_bets[player.seat] = bet
        self.__last_bet = bet

    def fold_bet(self, player):
        if self.__round_bets.get(player.seat):
            self.__folded_bets[player.seat] = self.__round_bets.pop(player.seat)

    def new_round(self):
        self.__round_bets = {}

    def bet_round_complete(self, num_active_players):
        round_bets = set(self.__round_bets.values())
        active_player_count = len(self.__round_bets)
        return len(round_bets) == 1 and active_player_count == num_active_players

    def split_pot(self, winners):
        pass

    def __repr__(self):
        return f'{self.__class__.__name__}(size={self.__size})'
