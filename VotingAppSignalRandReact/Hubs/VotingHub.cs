using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace VotingAppSignalRandReact.Hubs
{
    public class VotingHub : Hub
    {

        public static Dictionary<string, int> poll = new Dictionary<string, int>()
        {
             {"Apples",10 },
             {"Oranges",10},
             {"Bananas",10},
             {"Blueberries",10},
             {"mangoes",10},
        };

        public void Send(string name)
        {
            poll[name]++;
            string data = JsonConvert.SerializeObject(poll.Select(x => new { name = x.Key, count = x.Value }).ToList());

            Clients.All.SendAsync("ReceiveMessage", data);
        }
    }
}
